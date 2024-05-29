import { ComponentProps } from "react";

export default function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 64 63">
      <path d="M7.848.105h48.49a6.927 6.927 0 0 1 6.928 6.927v48.491a6.927 6.927 0 0 1-6.927 6.927h-12.32V38.974h7.775l1.159-9.021h-8.935v-5.77c0-2.604.723-4.385 4.474-4.385l4.785-.013v-8.062c-.835-.112-3.675-.361-6.966-.361-6.903 0-11.612 4.211-11.612 11.937v6.654h-7.801v9.021h7.801V62.45H7.849A6.927 6.927 0 0 1 .92 55.523V7.033A6.927 6.927 0 0 1 7.848.104ZM34.7 62.45h9.32-9.32Z" />
    </svg>
  );
}
