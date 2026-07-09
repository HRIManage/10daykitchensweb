declare module "sanity" {
  type ValidationRule = {
    required: () => ValidationRule;
    max: (length: number) => ValidationRule;
    warning: (message: string) => ValidationRule;
  };

  type FieldDefinition = {
    name?: string;
    title?: string;
    type: string;
    rows?: number;
    options?: {
      source?: string;
      maxLength?: number;
      hotspot?: boolean;
    };
    fields?: FieldDefinition[];
    of?: FieldDefinition[];
    validation?: (Rule: ValidationRule) => ValidationRule;
  };

  type TypeDefinition = {
    name: string;
    title: string;
    type: "document";
    fields: FieldDefinition[];
    preview?: {
      select: Record<string, string>;
    };
  };

  export function defineField(field: FieldDefinition): FieldDefinition;
  export function defineType(type: TypeDefinition): TypeDefinition;
}
