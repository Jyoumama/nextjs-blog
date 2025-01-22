import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  postalCode: z
    .string()
    .min(1,{message: "郵便番号は必須です"})
    .regex(/^\d{7}$/,{message: "郵便番号は7桁の数字を指定してください"}),
  localSpecialty: z
    .string()
    .min(1,{message: "特産品名は必須です"}),
});

type FormSchema = z.infer<typeof schema>; 

const SpecialtyForm: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <div>
      <h1>特産品投稿フォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
          <label htmlFor="postalCode">郵便番号:</label>
          <input id="postalCode" {...register("postalCode")} />
          <p>{errors.postalCode?.message}</p>
        </div>
        <div>
          <label htmlFor="localSpecialty">特産品:</label>
          <input id="localSpecialty" {...register("localSpecialty")} />
          <p>{errors.localSpecialty?.message}</p> 
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default SpecialtyForm;
