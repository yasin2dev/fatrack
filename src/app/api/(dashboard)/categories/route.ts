import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/categories";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
  try {
    const categories = await Category.find();

    return new NextResponse(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching categories" + error.message, {
      status: 500,
    });
  }
};


export const POST = async (request: Request) => {
  try {
    const { fatCategory } = await request.json();

    const newCategory = new Category({
      fatCategory
    });

    await newCategory.save();

    return new NextResponse(
      JSON.stringify({ message: "Category is created", category: newCategory }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating category" + error.message, {
      status: 500,
    });
  }
};