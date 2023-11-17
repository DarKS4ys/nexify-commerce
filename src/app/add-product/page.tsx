import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import FormSubmitButton from '../components/FormSubmitButton';

export const metadata = {
  title: 'Nexify - Add Product',
};

async function addProduct(formData: FormData) {
  'use server';

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  if(!name || !description || !imageUrl || !price) {
    throw Error('Missing required fields')
  }

  await prisma.product.create({
    data: {name, description, imageUrl, price},
  });

  redirect('/');
}

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="md:text-4xl text-2xl font-bold">Add Product</h1>
      <form action={addProduct} className="flex flex-col gap-3 w-full">
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image Url"
          type="url"
          className="input input-bordered w-full"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="Price (in cents)"
          className="input input-bordered w-full"
        />

        <FormSubmitButton className="btn-block uppercase">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
