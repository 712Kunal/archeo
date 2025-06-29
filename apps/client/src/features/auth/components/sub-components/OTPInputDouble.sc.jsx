import { useId } from "react";
import { OTPInput } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function OTPInputDouble() {
	const id = useId();
	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>OTP input double</Label>
			<OTPInput
				id={id}
				containerClassName="flex items-center gap-3 has-disabled:opacity-50"
				maxLength={6}
				render={({ slots }) => (
					<>
						<div className="flex">
							{slots.slice(0, 3).map((slot, idx) => (
								<Slot key={idx} {...slot} />
							))}
						</div>

						<div className="text-muted-foreground/80">
							<MinusIcon size={16} aria-hidden="true" />
						</div>

						<div className="flex">
							{slots.slice(3).map((slot, idx) => (
								<Slot key={idx} {...slot} />
							))}
						</div>
					</>
				)}
			/>
			<p
				className="mt-2 text-xs text-muted-foreground"
				role="region"
				aria-live="polite"
			>
				Built with{" "}
				<a
					className="underline hover:text-foreground"
					href="https://github.com/guilhermerodz/input-otp"
					target="_blank"
					rel="noopener nofollow"
				>
					Input OTP
				</a>
			</p>
		</div>
	);
}

function Slot(props) {
	return (
		<div
			className={cn(
				"relative -ms-px flex size-9 items-center justify-center border border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md",
				{ "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
			)}
		>
			{props.char !== null && <div>{props.char}</div>}
		</div>
	);
}
