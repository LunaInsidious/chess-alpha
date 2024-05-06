import Resources from "@/translation/@types/resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "ja";
    resources: Resources;
  }
}
