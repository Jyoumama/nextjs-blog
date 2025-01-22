import { NextPage } from "next";
import { useForm } from "react-hook-form";

const SpecialtyForm: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <h1>特産品投稿フォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* フォーム要素を追加する */}
      </form>
    </div>
  );
};

export default SpecialtyForm;
