import { ListeningLeason } from "../entities/listening-leason.entity";

export interface IListeningLeasonRepository {
  save(listeningLeason: ListeningLeason): Promise<void>
  findByID(listeningLeasonId: string): Promise<ListeningLeason | null>

}