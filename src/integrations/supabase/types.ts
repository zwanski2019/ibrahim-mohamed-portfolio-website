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
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          proposed_rate: number | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          worker_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          proposed_rate?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          worker_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          proposed_rate?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      categories: {
        Row: {
          active: boolean | null
          icon: string | null
          id: string
          name: string
          name_ar: string | null
          name_fr: string | null
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          icon?: string | null
          id?: string
          name: string
          name_ar?: string | null
          name_fr?: string | null
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          icon?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          name_fr?: string | null
          sort_order?: number | null
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
      course_bookmarks: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_bookmarks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_discussions: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          downvotes: number | null
          id: string
          is_pinned: boolean | null
          lesson_id: string | null
          parent_id: string | null
          title: string | null
          updated_at: string | null
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_pinned?: boolean | null
          lesson_id?: string | null
          parent_id?: string | null
          title?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_pinned?: boolean | null
          lesson_id?: string | null
          parent_id?: string | null
          title?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_discussions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "course_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          certificate_issued: boolean | null
          completed_at: string | null
          course_id: string | null
          enrolled_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours: number | null
          enrollment_count: number | null
          external_url: string
          id: string
          instructor_id: string | null
          instructor_name: string | null
          is_active: boolean | null
          is_featured: boolean | null
          language: string | null
          platform: string | null
          rating: number | null
          slug: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          total_ratings: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours?: number | null
          enrollment_count?: number | null
          external_url: string
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          platform?: string | null
          rating?: number | null
          slug: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          total_ratings?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours?: number | null
          enrollment_count?: number | null
          external_url?: string
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          platform?: string | null
          rating?: number | null
          slug?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          total_ratings?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      job_posts: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string | null
          description: string
          employer_id: string
          expires_at: string | null
          id: string
          job_type: Database["public"]["Enums"]["job_type"]
          latitude: number | null
          location: string
          longitude: number | null
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          salary_type: Database["public"]["Enums"]["salary_type"]
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string | null
          description: string
          employer_id: string
          expires_at?: string | null
          id?: string
          job_type: Database["public"]["Enums"]["job_type"]
          latitude?: number | null
          location: string
          longitude?: number | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type: Database["public"]["Enums"]["salary_type"]
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string | null
          description?: string
          employer_id?: string
          expires_at?: string | null
          id?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          latitude?: number | null
          location?: string
          longitude?: number | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type?: Database["public"]["Enums"]["salary_type"]
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_path_courses: {
        Row: {
          course_id: string | null
          id: string
          learning_path_id: string | null
          order_index: number
        }
        Insert: {
          course_id?: string | null
          id?: string
          learning_path_id?: string | null
          order_index: number
        }
        Update: {
          course_id?: string | null
          id?: string
          learning_path_id?: string | null
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_courses_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string | null
          creator_id: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"] | null
          estimated_hours: number | null
          id: string
          is_public: boolean | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          estimated_hours?: number | null
          id?: string
          is_public?: boolean | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          estimated_hours?: number | null
          id?: string
          is_public?: boolean | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_notes: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          timestamp_seconds: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          timestamp_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          timestamp_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_notes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_notes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          external_url: string
          id: string
          is_free: boolean | null
          lesson_type: Database["public"]["Enums"]["lesson_type"] | null
          order_index: number
          title: string
          transcript: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          external_url: string
          id?: string
          is_free?: boolean | null
          lesson_type?: Database["public"]["Enums"]["lesson_type"] | null
          order_index: number
          title: string
          transcript?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          external_url?: string
          id?: string
          is_free?: boolean | null
          lesson_type?: Database["public"]["Enums"]["lesson_type"] | null
          order_index?: number
          title?: string
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
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
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          employer_id: string
          id: string
          job_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          worker_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          employer_id: string
          id?: string
          job_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          worker_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          employer_id?: string
          id?: string
          job_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          location: string | null
          phone: string | null
          rating: number | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          location?: string | null
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
          verified?: boolean | null
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
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          job_id: string | null
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      user_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          progress_percentage: number | null
          status: Database["public"]["Enums"]["progress_status"] | null
          time_spent_minutes: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          progress_percentage?: number | null
          status?: Database["public"]["Enums"]["progress_status"] | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          progress_percentage?: number | null
          status?: Database["public"]["Enums"]["progress_status"] | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "pending" | "accepted" | "rejected" | "withdrawn"
      course_difficulty: "beginner" | "intermediate" | "advanced"
      job_status: "draft" | "published" | "closed" | "filled"
      job_type: "full-time" | "part-time" | "contract" | "freelance"
      lesson_type: "video" | "article" | "interactive" | "quiz"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      post_status: "draft" | "published" | "scheduled"
      progress_status: "not_started" | "in_progress" | "completed"
      project_status: "draft" | "published" | "archived"
      salary_type: "hourly" | "daily" | "weekly" | "monthly" | "fixed"
      skill_category:
        | "frontend"
        | "backend"
        | "mobile"
        | "devops"
        | "design"
        | "other"
      urgency_level: "low" | "medium" | "high"
      user_type: "employer" | "worker"
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
      application_status: ["pending", "accepted", "rejected", "withdrawn"],
      course_difficulty: ["beginner", "intermediate", "advanced"],
      job_status: ["draft", "published", "closed", "filled"],
      job_type: ["full-time", "part-time", "contract", "freelance"],
      lesson_type: ["video", "article", "interactive", "quiz"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      post_status: ["draft", "published", "scheduled"],
      progress_status: ["not_started", "in_progress", "completed"],
      project_status: ["draft", "published", "archived"],
      salary_type: ["hourly", "daily", "weekly", "monthly", "fixed"],
      skill_category: [
        "frontend",
        "backend",
        "mobile",
        "devops",
        "design",
        "other",
      ],
      urgency_level: ["low", "medium", "high"],
      user_type: ["employer", "worker"],
    },
  },
} as const
