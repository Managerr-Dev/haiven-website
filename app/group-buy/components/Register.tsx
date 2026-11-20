import RegisterForm from "./RegisterForm";
import { container, eyebrowClass, sectionPadding } from "./styles";

const Register = () => (
	<section id="register" className="scroll-mt-16 bg-haiven-blue text-white">
		<div
			className={`${container} ${sectionPadding} grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-11`}
		>
			<div className="flex flex-col gap-[18px]">
				<p className={`${eyebrowClass} text-accent-green`}>Register free</p>
				<h2 className="m-0 text-[clamp(38px,5.6vw,64px)] leading-none font-extrabold tracking-[-0.045em]">
					Metering a property?
					<br />
					Don’t pay retail.
					<br />
					<span className="text-accent-green">Pay wholesale.</span>
				</h2>
				<p className="m-0 max-w-[36ch] text-lg leading-normal text-[#C9D0F0]">
					Join the group purchase in two minutes. Nothing to pay now. You only pay
					after your group closes and you’ve seen your price.
				</p>
			</div>
			<div className="rounded-[28px] bg-white p-[clamp(22px,3.4vw,36px)] text-haiven-blue">
				<RegisterForm />
			</div>
		</div>
	</section>
);

export default Register;
