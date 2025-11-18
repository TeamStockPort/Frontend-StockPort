type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h1 className="mb-6 font-bold text-white text-2xl">{title}</h1>;
};

export default Title;
