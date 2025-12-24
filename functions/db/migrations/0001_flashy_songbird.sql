CREATE TABLE "actors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"biography" text,
	"birth_date" date,
	"death_date" date,
	"gender" varchar(10),
	"place_of_birth" varchar(255),
	"profile_url" text,
	"popularity" text
);
--> statement-breakpoint
CREATE TABLE "collection_movies" (
	"collection_id" uuid NOT NULL,
	"movie_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"movie_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"tmdb_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"original_title" varchar(255),
	"overview" text,
	"release_date" date,
	"runtime" integer,
	"age_rating" varchar(10),
	"status" varchar(50),
	"original_language" varchar(20),
	"poster_url" text,
	"backdrop_url" text,
	"rating" real,
	"popularity" real,
	"production_countries" jsonb,
	"budget" integer,
	"revenue" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movie_actors" (
	"movie_id" uuid NOT NULL,
	"actor_id" uuid NOT NULL,
	"character" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "movie_genres" (
	"movie_id" uuid NOT NULL,
	"genre_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "collection_movies" ADD CONSTRAINT "collection_movies_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_movies" ADD CONSTRAINT "collection_movies_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_actor_id_actors_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."actors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_password_unique" UNIQUE("password");