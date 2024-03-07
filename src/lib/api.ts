export function unauthorizedResponse(message = "Unauthorized") {
  return new Response(
    JSON.stringify({
      success: false,
      message,
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export function successResponse(message = "Success", data?: any) {
  return new Response(
    JSON.stringify({
      success: true,
      message,
      data,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export function errorResponse(message = "Error", status = 500) {
  return new Response(
    JSON.stringify({
      success: false,
      message,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
