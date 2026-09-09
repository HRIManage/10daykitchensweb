"use client";

import { useEffect, useReducer, useRef } from "react";
import ProgressBar from "@/components/estimate/ProgressBar";
import WelcomeStep from "@/components/estimate/steps/WelcomeStep";
import ProjectStep from "@/components/estimate/steps/ProjectStep";
import ContactStep, { type ContactValue } from "@/components/estimate/steps/ContactStep";
import CalculatingStep from "@/components/estimate/steps/CalculatingStep";
import EstimateStep from "@/components/estimate/steps/EstimateStep";
import SummaryStep from "@/components/estimate/steps/SummaryStep";
import ScheduleStep from "@/components/estimate/steps/ScheduleStep";
import ConfirmationStep from "@/components/estimate/steps/ConfirmationStep";
import { calculateEstimate, type EstimateInput, type EstimateResult } from "@/lib/estimate";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Screen =
  | "welcome"
  | "project"
  | "contact"
  | "calculating"
  | "estimate"
  | "summary"
  | "schedule"
  | "confirmation";

type State = {
  screen: Screen;
  input: EstimateInput;
  contact: ContactValue;
  submitting: boolean;
  result: EstimateResult | null;
};

const INITIAL: State = {
  screen: "welcome",
  input: {
    size: "standard",
    projectType: "tub_to_shower",
    upgrades: [],
    finish: "standard",
    county: "thurston",
    secondFloor: false,
    waterDamage: false,
    builtBefore1980: false,
    ceilingToo: false,
    movingPlumbing: false,
    movingWalls: false,
    permitsNeeded: false,
  },
  contact: { firstName: "", lastName: "", email: "", phone: "", city: "", zip: "", timeline: "" },
  submitting: false,
  result: null,
};

type Action =
  | { type: "goto"; screen: Screen }
  | { type: "patchInput"; patch: Partial<EstimateInput> }
  | { type: "patchContact"; patch: Partial<ContactValue> }
  | { type: "submitting" }
  | { type: "result"; result: EstimateResult }
  | { type: "hydrate"; state: State };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "goto":
      return { ...state, screen: action.screen };
    case "patchInput":
      return { ...state, input: { ...state.input, ...action.patch } };
    case "patchContact":
      return { ...state, contact: { ...state.contact, ...action.patch } };
    case "submitting":
      return { ...state, submitting: true };
    case "result":
      return { ...state, submitting: false, result: action.result, screen: "calculating" };
    case "hydrate":
      return action.state;
  }
}

const STORAGE_KEY = "bathroom-estimate-v1";
const STAGE_BY_SCREEN: Record<Screen, number> = {
  welcome: 0,
  project: 4,
  contact: 5,
  calculating: 6,
  estimate: 6,
  summary: 6,
  schedule: 6,
  confirmation: 6,
};

export default function EstimateWizard() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as State;
        if (saved.screen === "calculating") saved.screen = "contact";
        dispatch({ type: "hydrate", state: { ...saved, submitting: false } });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [state.screen]);

  useEffect(() => {
    if (state.screen !== "calculating") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => dispatch({ type: "goto", screen: "estimate" }),
      reduced ? 400 : 1600,
    );
    return () => window.clearTimeout(timer);
  }, [state.screen]);

  const submitContact = async () => {
    dispatch({ type: "submitting" });
    window.gtag?.("event", "estimate_contact_submit");
    const local = calculateEstimate(state.input);
    try {
      const res = await fetch("/api/bathroom-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: state.input, contact: state.contact }),
      });
      const data = (await res.json()) as EstimateResult & { emailed?: boolean };
      window.gtag?.("event", "generate_lead", { form: "bathroom-estimate" });
      dispatch({
        type: "result",
        result: {
          low: data.low,
          high: data.high,
          midpoint: data.midpoint,
          confidence: data.confidence,
        },
      });
    } catch {
      dispatch({ type: "result", result: local });
    }
  };

  const heading = (label: string) => (
    <h2 ref={headingRef} tabIndex={-1} className="sr-only">
      {label}
    </h2>
  );

  return (
    <div className="site-container max-w-4xl py-10 sm:py-14">
      {state.screen !== "welcome" ? (
        <div className="mb-10">
          <ProgressBar current={STAGE_BY_SCREEN[state.screen]} />
        </div>
      ) : null}

      {state.screen === "welcome" && (
        <>
          {heading("Welcome")}
          <WelcomeStep
            onStart={() => {
              window.gtag?.("event", "estimate_start");
              dispatch({ type: "goto", screen: "project" });
            }}
          />
        </>
      )}

      {state.screen === "project" && (
        <>
          {heading("Your project")}
          <ProjectStep
            value={state.input}
            onChange={(patch) => dispatch({ type: "patchInput", patch })}
            onNext={() => dispatch({ type: "goto", screen: "contact" })}
            onBack={() => dispatch({ type: "goto", screen: "welcome" })}
          />
        </>
      )}

      {state.screen === "contact" && (
        <>
          {heading("Contact information")}
          <ContactStep
            value={state.contact}
            onChange={(patch) => dispatch({ type: "patchContact", patch })}
            onSubmit={submitContact}
            onBack={() => dispatch({ type: "goto", screen: "project" })}
            submitting={state.submitting}
          />
        </>
      )}

      {state.screen === "calculating" && (
        <>
          {heading("Calculating your estimate")}
          <CalculatingStep />
        </>
      )}

      {state.screen === "estimate" && state.result && (
        <>
          {heading("Your estimate")}
          <EstimateStep
            result={state.result}
            onSchedule={() => {
              window.gtag?.("event", "estimate_schedule_view");
              dispatch({ type: "goto", screen: "schedule" });
            }}
            onSummary={() => dispatch({ type: "goto", screen: "summary" })}
          />
        </>
      )}

      {state.screen === "summary" && (
        <>
          {heading("Project summary")}
          <SummaryStep
            input={state.input}
            timeline={state.contact.timeline}
            onEdit={() => dispatch({ type: "goto", screen: "project" })}
            onSchedule={() => dispatch({ type: "goto", screen: "schedule" })}
          />
        </>
      )}

      {state.screen === "schedule" && (
        <>
          {heading("Schedule your consultation")}
          <ScheduleStep
            onBack={() => dispatch({ type: "goto", screen: state.result ? "estimate" : "summary" })}
          />
        </>
      )}

      {state.screen === "confirmation" && (
        <>
          {heading("Confirmed")}
          <ConfirmationStep />
        </>
      )}
    </div>
  );
}
