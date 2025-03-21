import { ListeningLeason } from "../../../domain/entities/listening-leason.entity";
import { IListeningLeasonRepository } from "../../../domain/repository/listening-leason-repository.interface";
import { CreateListeningLeasonInputDto } from "../../schemas/create-listening-leason.schema";




export class CreateListeningLeasonUseCase {
  constructor(
    private readonly listeningLeasonRepository: IListeningLeasonRepository
  ) { }

  async execute({ content, taskId, transcription, url }: CreateListeningLeasonInputDto) {

    const listeningLeason = new ListeningLeason({
      content,
      transcription,
      url,
      taskId,
    });
    await this.listeningLeasonRepository.save(listeningLeason)
  }
}
