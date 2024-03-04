
export interface TicketsProps{
  id: string;
  name: string;
  status: string;
  descrption: string
  created_at: Date | null;
  updated_at: Date | null;
  custumerId: string | null;
  userId: string | null
}
