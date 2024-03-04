import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// Define loader variants using cva
const loaderVariants = cva("animate-spin rounded-full border-t-transparent", {
  variants: {
    size: {
      sm: "size-4 border-2",
      md: "size-8 border-4",
      lg: "size-12 border-4",
    },
    // color: {
    //   dark: "border-gray-900",
    //   light: "border-gray-300",
    // },
  },
  defaultVariants: {
    size: "md",
    // color: "dark",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div ref={ref} className="flex h-full items-center justify-center">
        <div {...props} className={loaderVariants({ size, className })}></div>
      </div>
    );
  },
);
Loader.displayName = "Loader";

export { Loader };
