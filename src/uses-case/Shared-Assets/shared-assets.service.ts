import { Injectable } from '@nestjs/common';
import { SharedAssetsRepository } from "./Shared-Assets-Repo/SharedAssets.repository";

@Injectable()
export class SharedAssetsService {

  constructor(private SharedAssetsRepository: SharedAssetsRepository) {}

}
