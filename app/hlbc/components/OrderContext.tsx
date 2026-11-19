"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { MeterType } from "../data";

/**
 * The meter quantities in the registration form, shared so other sections
 * ("Join this group", the savings calculator) can fill them in. Kept as the
 * strings in the inputs so a cleared box stays empty while typing.
 */
export type OrderQty = Record<MeterType, string>;

type OrderContextValue = {
	qty: OrderQty;
	setQty: (type: MeterType, value: string) => void;
	/** Calculator: order exactly this many of one phase meter. */
	orderOnly: (type: MeterType, quantity: number) => void;
	/** "Join this group": make sure the form includes this phase meter. */
	include: (type: MeterType) => void;
	reset: () => void;
};

const EMPTY: OrderQty = { single: "", three: "" };

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
	const [qty, setQtyState] = useState<OrderQty>(EMPTY);

	const value = useMemo<OrderContextValue>(
		() => ({
			qty,
			setQty: (type, v) => setQtyState((q) => ({ ...q, [type]: v })),
			orderOnly: (type, quantity) =>
				setQtyState({
					single: type === "single" ? String(quantity) : "",
					three: type === "three" ? String(quantity) : "",
				}),
			include: (type) =>
				setQtyState((q) =>
					Number(q[type]) > 0 ? q : { ...q, [type]: "1" },
				),
			reset: () => setQtyState(EMPTY),
		}),
		[qty],
	);

	return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
	const ctx = useContext(OrderContext);
	if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
	return ctx;
}
