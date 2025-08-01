import SpacerPrimitive, { type SpacerProps as SpacerPrimitiveProps } from "@heroui/spacer";

export type SpacerProps = SpacerPrimitiveProps;

export function Spacer(props: SpacerProps) {
  return <SpacerPrimitive {...props} />;
}
