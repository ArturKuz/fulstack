import type { PartProps } from "../models";
import { Part } from "./Part";

export const Content = (props: { parts: PartProps[] }) => (
  <>
    {props.parts.map((item: PartProps) => (
      <Part name={item.name} exercises={item.exercises} id={item.id} key={item.id} />
    ))}
  </>
)
