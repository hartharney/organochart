import { toast } from "react-toastify";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ShowError = (error: any) => {
  if (error?.graphQLErrors?.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error.graphQLErrors.forEach((err: any) => {
      const originalMessage =
        err?.extensions?.originalError?.message ||
        err?.message ||
        "Unknown error";

      const locations = err.locations
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.map((loc: any) => `Line: ${loc.line}, Column: ${loc.column}`)
        .join(", ");

      const path = err?.path?.join(".") || null;

      toast.error(
        `❌ ${originalMessage}${path ? ` [Path: ${path}]` : ""}${
          locations ? ` at ${locations}` : ""
        }`
      );
    });
  } else if (error?.message) {
    toast.error(`❌ ${error.message}`);
  } else {
    toast.error("❌ An unexpected error occurred");
  }
};
