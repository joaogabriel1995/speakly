import { Router } from "express";
import { container } from "../container";

const router = Router();

router.get("/:id", async (request, response) => {
  console.log(request)
  const result = await container.getListeningLeasonByIdController.handle({
    body: request.body,
    method: request.method,
    headers: request.headers,
    params: request.params,
  });
  response.status(result.statusCode).json(result.body);
});

export { router as getListeningLeasonByIdRouter };
