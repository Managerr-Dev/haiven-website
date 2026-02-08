interface Props {
	text: string;
}
const SectionBadge = ({ text }: Props) => {
	return (
		<div className="py-1.5 px-2.5 flex items-center gap-[5px] bg-white rounded-[100px] w-fit border-[0.85px] border-[#13247E26]">
			<div className="size-[3px] bg-haiven-blue"></div>
			<p className="font-medium text-xs leading-[18px] text-haiven-blue">
				{text}
			</p>
		</div>
	);
};

export default SectionBadge;
