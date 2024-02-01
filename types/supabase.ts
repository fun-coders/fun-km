export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  fun_km: {
    Tables: {
      km_document: {
        Row: {
          created_at: string;
          created_by: string;
          id: number;
          key_words: string[] | null;
          managed_by: string[] | null;
          page_group_id: number | null;
          share_action_default: Database['public']['Enums']['km_share_action'];
          share_scope_default: Database['public']['Enums']['km_share_scope'];
          share_scope_page_group_id: number | null;
          summary: string | null;
          title: string;
          topic: string | null;
          updated_at: string;
        };
        Insert: {
          created_at: string;
          created_by: string;
          id?: number;
          key_words?: string[] | null;
          managed_by?: string[] | null;
          page_group_id?: number | null;
          share_action_default?: Database['public']['Enums']['km_share_action'];
          share_scope_default?: Database['public']['Enums']['km_share_scope'];
          share_scope_page_group_id?: number | null;
          summary?: string | null;
          title: string;
          topic?: string | null;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: number;
          key_words?: string[] | null;
          managed_by?: string[] | null;
          page_group_id?: number | null;
          share_action_default?: Database['public']['Enums']['km_share_action'];
          share_scope_default?: Database['public']['Enums']['km_share_scope'];
          share_scope_page_group_id?: number | null;
          summary?: string | null;
          title?: string;
          topic?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'km_document_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'km_document_page_group_id_fkey';
            columns: ['page_group_id'];
            referencedRelation: 'km_page_group';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'km_document_share_scope_page_group_id_fkey';
            columns: ['share_scope_page_group_id'];
            referencedRelation: 'km_page_group';
            referencedColumns: ['id'];
          },
        ];
      };
      km_page_group: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          need_review: boolean;
          parent_id: number | null;
          review_person: string[] | null;
          share_action_default: Database['public']['Enums']['km_share_action'];
          share_scope_default: Database['public']['Enums']['km_share_scope'];
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          need_review?: boolean;
          parent_id?: number | null;
          review_person?: string[] | null;
          share_action_default?: Database['public']['Enums']['km_share_action'];
          share_scope_default?: Database['public']['Enums']['km_share_scope'];
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          need_review?: boolean;
          parent_id?: number | null;
          review_person?: string[] | null;
          share_action_default?: Database['public']['Enums']['km_share_action'];
          share_scope_default?: Database['public']['Enums']['km_share_scope'];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      km_tenant: {
        Row: {
          created_at: string;
          created_by: string;
          favicon_path: string | null;
          id: string;
          invitation_code: string;
          is_review_open: boolean;
          is_share_action_change_allow: boolean;
          is_share_action_default: Database['public']['Enums']['km_share_action'];
          is_share_scope_change_allow: boolean;
          is_share_scope_default: Database['public']['Enums']['km_share_scope'];
          logo_path: string | null;
          name: string;
          tenant_type: Database['public']['Enums']['km_tenant_type'];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          favicon_path?: string | null;
          id?: string;
          invitation_code?: string;
          is_review_open?: boolean;
          is_share_action_change_allow?: boolean;
          is_share_action_default?: Database['public']['Enums']['km_share_action'];
          is_share_scope_change_allow?: boolean;
          is_share_scope_default?: Database['public']['Enums']['km_share_scope'];
          logo_path?: string | null;
          name: string;
          tenant_type?: Database['public']['Enums']['km_tenant_type'];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          favicon_path?: string | null;
          id?: string;
          invitation_code?: string;
          is_review_open?: boolean;
          is_share_action_change_allow?: boolean;
          is_share_action_default?: Database['public']['Enums']['km_share_action'];
          is_share_scope_change_allow?: boolean;
          is_share_scope_default?: Database['public']['Enums']['km_share_scope'];
          logo_path?: string | null;
          name?: string;
          tenant_type?: Database['public']['Enums']['km_tenant_type'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'km_tenant_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      km_tenant_users: {
        Row: {
          created_at: string;
          id: string;
          is_manager: boolean;
          tenant_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_manager?: boolean;
          tenant_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_manager?: boolean;
          tenant_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'km_tenant_users_tenant_id_fkey';
            columns: ['tenant_id'];
            referencedRelation: 'km_tenant';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'km_tenant_users_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_new_tenant: {
        Args: {
          created_by_val: string;
          tenant_name: string;
        };
        Returns: string;
      };
      register: {
        Args: {
          created_by_val: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  pgbouncer: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_auth: {
        Args: {
          p_usename: string;
        };
        Returns: {
          username: string;
          password: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      km_share_action: 'read-only' | 'editable' | 'manageable';
      km_share_scope: 'private' | 'group' | 'public';
      km_tenant_type: 'personal' | 'enterprise';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
