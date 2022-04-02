export interface IBrand {
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface IBrandCreate {
  name: string;
  description: string;
  logo: string;
}
