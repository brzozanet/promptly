import { Router, Request, Response } from "express";
import { ErrorResponse, RegisterResponse } from "../types/auth";

export const authRouter = Router();

// NOTE: POST /api/auth/register

authRouter.post("/register", (request: Request, response: Response) => {
  try {
    const { name, email, password }: RegisterResponse = request.body;

    if (!name || !email || !password) {
      return response
        .status(400)
        .json({ error: "Wszystkie dane są wymagane" } as ErrorResponse);
    }
    return response.json({ name, email, password });
  } catch (error) {
    const internalError: ErrorResponse = {
      error: "Server crashed succesfully 😵‍💫",
      details: "Database is temporarily unavailable",
    };
    return response.status(500).json(internalError);
  }
});
