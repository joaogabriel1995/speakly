import { Router } from "express";
import { container } from "../container";

const router = Router();

router.get("/:journeyId", async (request, response) => {
  console.log(request)
  const result = await container.findManyTasksByJourneyController.handle({
    body: request.body,
    method: request.method,
    headers: request.headers,
    params: request.params,
  });
  response.status(result.statusCode).json(result.body);
});

export { router as findManyTasksByJourneyRouter };
