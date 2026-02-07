export interface ChatRequest {
  message: string;
  previousResponseId?: string;
}

export interface ChatResponse {
  id: string; // to be used as previousResponseId
  message: string;
  timestamp: string;
}

export interface ChatError {
  error: string;
  details?: string;
}
