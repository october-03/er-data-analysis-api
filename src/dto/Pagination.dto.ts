import { User } from 'src/entities/User.entity';

interface PaginationDto {
  user: User;
  seasonId: number;
  page: number;
}

export default PaginationDto;
