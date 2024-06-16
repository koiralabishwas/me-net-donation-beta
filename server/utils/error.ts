import { NextResponse } from "next/server";

export async function handleError<T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Error) 
      throw new Error(e.message);
    throw new Error(errorMessage);
  }
}

export async function handleErrorWithResponse<T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T | NextResponse> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Error)
      return NextResponse.json({ status: 400, message: e.message });
    return NextResponse.json({ status: 501, message: errorMessage });
  }
}
