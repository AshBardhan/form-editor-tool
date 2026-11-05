export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends ApiError {
  constructor(message = "The request is invalid") {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Please sign in to continue") {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "An unexpected error occurred") {
    super(message, 500);
  }
}
