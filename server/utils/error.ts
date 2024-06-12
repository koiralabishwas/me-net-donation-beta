import { NextResponse } from 'next/server';

export async function handleError<T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(errorMessage);
    }
  }
}

export async function handleErrorWithResponse<T>(
  fn: () => Promise<T>,
  statusCode: number,
  errorMessage: string
): Promise<T | NextResponse> {
  try {
    return await fn();
  } catch (e) {
    const message = e instanceof Error ? e.message : errorMessage;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
