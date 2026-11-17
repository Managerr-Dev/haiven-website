import RegisterForm from "./RegisterForm";
import { container, eyebrowClass, sectionPadding } from "./styles";

const Register = () => (
	<section id="register" className="scroll-mt-[60px] bg-haiven-blue text-white">
		<div
			className={`${container} ${sectionPadding} grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-10`}
		>
			<div className="flex flex-col gap-[18px]">
				<p className={`${eyebrowClass} text-accent-green`}>Free · Non-binding</p>
				<h2 className="m-0 text-[clamp(40px,6vw,68px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
					Join the
					<br />
					<span className="text-accent-green">pool.</span>
				</h2>
				<p className="m-0 max-w-[34ch] text-lg leading-[1.5] text-[#C9D0F0]">
					Register your interest in two minutes. You pay nothing until your pool
					provisionally closes, and we tell you the price first.
				</p>
				<p className="m-0 text-[15px] text-[#C9D0F0]">
					Questions?{" "}
					<a
						href="mailto:info@haiven.net"
						className="font-bold text-accent-green underline"
					>
						info@haiven.net
					</a>
				</p>
			</div>
			<div className="rounded-3xl bg-white p-[clamp(22px,3.4vw,40px)] text-haiven-blue">
				<RegisterForm />
			</div>
		</div>
	</section>
);

export default Register;
