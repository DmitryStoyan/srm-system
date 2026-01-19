import { EnumStatus } from "~~/types/deals.types";
import type { IColumn } from "./kanban.types";

export const KANBAN_DATA: IColumn[] = [
  {
    id: EnumStatus.TODO,
    name: "Входящие",
    items: [],
  },
  {
    id: EnumStatus.TO_BE_AGREED,
    name: "На согласовании",
    items: [],
  },
  {
    id: EnumStatus.IN_PROGRESS,
    name: "В производстве",
    items: [],
  },
  {
    id: EnumStatus.PRODUCED,
    name: "Произведено",
    items: [],
  },
  {
    id: EnumStatus.DONE,
    name: "К отгрузке",
    items: [],
  },
];
