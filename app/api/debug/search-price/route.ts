import { createPrice, searchPrice } from "@/server/stripe";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  productId : "prod_Q2GxSqbpfzdba4",
  amount : number
}

export async function POST(req:NextRequest , res : NextRequest) {

  const body : Body = await req.json()
  let price = await searchPrice(await body.productId ,await body.amount)
  if (!price){
    const  {id : createdPrice} = await createPrice({product:body.productId ,
      currency: "jpy",
      // amount passed from the body
      unit_amount: body.amount,
      metadata : {
        // stripe query cannot retrive from unit_amount
        // use this medatta.price to retrive price from amount
        amount : body.amount
      }})

      return NextResponse.json({createdPrice , status : 201} ,)
  }
  
  return NextResponse.json({price , status : 200})
}