import React from "react";
import Hero from "../components/contactUs/Hero";
import ContactForm from "../components/contactUs/ContactForm";
import Faq from "../components/landing/Faq";

const page = () => {
	return (
		<div>
			<Hero />
			<section className="bg-haiven-blue relative pt-[728px]">
				<div className=" bg-haiven-blue z-10 -top-14 max-w-[1113.79px] w-full mx-auto absolute left-1/2 -translate-x-1/2 py-[84.85px]">
					<ContactForm />
				</div>
				<div className="">
					<Faq />
				</div>
			</section>
		</div>
	);
};

export default page;
