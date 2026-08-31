import Link from "next/link";
import type { ReactNode } from "react";
import type { BlogBody } from "@/lib/blog";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const LINK_CLASS =
  "font-medium text-brand-dark underline underline-offset-2 transition-colors hover:text-brand";

/** Turns `[label](/path)` sequences in a string into <Link>/<a> nodes. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  LINK_RE.lastIndex = 0;

  for (let match = LINK_RE.exec(text); match !== null; match = LINK_RE.exec(text)) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
    nodes.push(
      href.startsWith("/") ? (
        <Link key={key} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ) : (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {label}
        </a>
      ),
    );
    lastIndex = match.index + match[0].length;
    key += 1;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** Renders an article body of plain-string paragraphs and/or typed content blocks. */
export default function BlogContent({ body }: { body: BlogBody }) {
  return (
    <div className="space-y-6 text-[1.02rem] leading-8 text-ink-soft">
      {body.map((block, idx) => {
        if (typeof block === "string") {
          return <p key={idx}>{renderInline(block)}</p>;
        }

        switch (block.type) {
          case "p":
            return <p key={idx}>{renderInline(block.text)}</p>;

          case "h2":
            return (
              <h2 key={idx} className="pt-8 text-[1.9rem] leading-tight text-ink">
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={idx} className="pt-3 text-[1.3rem] font-semibold leading-snug text-ink">
                {block.text}
              </h3>
            );

          case "list": {
            const items = block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>);
            return block.ordered ? (
              <ol key={idx} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-brand-dark">
                {items}
              </ol>
            ) : (
              <ul key={idx} className="list-disc space-y-2 pl-6 marker:text-brand-dark">
                {items}
              </ul>
            );
          }

          case "table":
            return (
              <div key={idx} className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.95rem]">
                  <thead>
                    <tr className="border-b-2 border-ink/15 text-left">
                      {block.headers.map((header, i) => (
                        <th
                          key={i}
                          className="py-3 pr-5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i} className="border-b border-line/70 align-top">
                        {row.map((cell, j) => (
                          <td key={j} className="py-3 pr-5 leading-relaxed">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
