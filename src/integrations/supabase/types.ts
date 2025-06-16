export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          id: string
          ip_address: unknown | null
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          likes: number | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: Database["public"]["Enums"]["post_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          likes?: number | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          likes?: number | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
          replied: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
          replied?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
          replied?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      experience: {
        Row: {
          achievements: string[] | null
          company: string
          company_url: string | null
          created_at: string | null
          current_job: boolean | null
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          logo_url: string | null
          position: string
          sort_order: number | null
          start_date: string
        }
        Insert: {
          achievements?: string[] | null
          company: string
          company_url?: string | null
          created_at?: string | null
          current_job?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          position: string
          sort_order?: number | null
          start_date: string
        }
        Update: {
          achievements?: string[] | null
          company?: string
          company_url?: string | null
          created_at?: string | null
          current_job?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          position?: string
          sort_order?: number | null
          start_date?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          description: string | null
          file_size: number | null
          file_type: string
          file_url: string
          filename: string
          folder: string | null
          id: string
          original_name: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          filename: string
          folder?: string | null
          id?: string
          original_name: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          filename?: string
          folder?: string | null
          id?: string
          original_name?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string | null
          demo_url: string | null
          description: string | null
          detailed_description: string | null
          featured: boolean | null
          featured_image_url: string | null
          gallery_images: string[] | null
          github_url: string | null
          id: string
          live_url: string | null
          metrics: Json | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["project_status"] | null
          tech_stack: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          detailed_description?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          github_url?: string | null
          id?: string
          live_url?: string | null
          metrics?: Json | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          detailed_description?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          github_url?: string | null
          id?: string
          live_url?: string | null
          metrics?: Json | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          name: string
          proficiency: number | null
          sort_order: number | null
          years_experience: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          proficiency?: number | null
          sort_order?: number | null
          years_experience?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          proficiency?: number | null
          sort_order?: number | null
          years_experience?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string | null
          featured: boolean | null
          id: string
          name: string
          position: string | null
          rating: number | null
          sort_order: number | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name: string
          position?: string | null
          rating?: number | null
          sort_order?: number | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          position?: string | null
          rating?: number | null
          sort_order?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_status: "draft" | "published" | "scheduled"
      project_status: "draft" | "published" | "archived"
      skill_category:
        | "frontend"
        | "backend"
        | "mobile"
        | "devops"
        | "design"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      post_status: ["draft", "published", "scheduled"],
      project_status: ["draft", "published", "archived"],
      skill_category: [
        "frontend",
        "backend",
        "mobile",
        "devops",
        "design",
        "other",
      ],
    },
  },
} as const
