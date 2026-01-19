import { useQuery } from "@tanstack/vue-query";
import { collection, getDocs } from "firebase/firestore";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~~/types/deals.types";
import type { IColumn } from "./kanban.types";

export function useKanbanQuery() {
  return useQuery<IDeal[], Error, IColumn[]>({
    queryKey: ["deals"],

    initialData: [],

    queryFn: async () => {
      const { $firebase } = useNuxtApp();

      const snapshot = await getDocs(collection($firebase.db, "deals"));

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IDeal[];
    },

    select(deals) {
      const board: IColumn[] = KANBAN_DATA.map((col) => ({
        ...col,
        items: [],
      }));

      deals.forEach((deal) => {
        const column = board.find((col) => col.id === deal.status);
        if (!column) return;

        column.items.push({
          id: deal.id,
          name: deal.name,
          price: deal.price,
          createdAt: deal.createAt,
          companyName: deal.customer.name,
          status: deal.status,
        });
      });

      return board;
    },
  });
}
