import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1667743342150 implements MigrationInterface {
    name = 'migrations1667743342150';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "sports" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_4fa1063d368e1fd68ea63c7d860" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "user_actions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rate" integer, "comment" character varying, "class_id" integer, CONSTRAINT "PK_3c8a683381b553ee59ce5b7b13a" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TYPE "public"."classes_age_level_enum" AS ENUM('adult', 'youngAdult', 'youth', 'children')`
        );
        await queryRunner.query(
            `CREATE TABLE "classes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "age_level" "public"."classes_age_level_enum" NOT NULL, "week_schedule" json NOT NULL, "max_number_of_participants" integer DEFAULT 10, "class_duration" character varying, "rating" numeric NOT NULL DEFAULT 0, "sport_id" integer, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TYPE "public"."users_age_level_enum" AS ENUM('adult', 'youngAdult', 'youth', 'children')`
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT user, "age_level" "public"."users_age_level_enum" NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "class_participants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "class_id" integer, CONSTRAINT "PK_33ebb5629e24726c5227ca28ff2" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_a8afe0dc26bf08b0e7715b99c1" ON "class_participants" ("user_id", "class_id") `
        );
        await queryRunner.query(
            `ALTER TABLE "user_actions" ADD CONSTRAINT "FK_f30f989f8d07c1e94261cf725cb" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "classes" ADD CONSTRAINT "FK_73ad1ecd8833fc8fd0f5552d3c1" FOREIGN KEY ("sport_id") REFERENCES "sports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "class_participants" ADD CONSTRAINT "FK_bd6e6e980f0c6bd2f6f877ad9ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "class_participants" ADD CONSTRAINT "FK_237b03f6eed83cebeb3a0474ef5" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD "is_verified" boolean NOT NULL DEFAULT false`
        );
        await queryRunner.query(
            `ALTER TABLE "classes" ALTER COLUMN "max_number_of_participants" SET DEFAULT 10`
        );
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "rating" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT user`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "class_participants" DROP CONSTRAINT "FK_237b03f6eed83cebeb3a0474ef5"`
        );
        await queryRunner.query(
            `ALTER TABLE "class_participants" DROP CONSTRAINT "FK_bd6e6e980f0c6bd2f6f877ad9ee"`
        );
        await queryRunner.query(
            `ALTER TABLE "classes" DROP CONSTRAINT "FK_73ad1ecd8833fc8fd0f5552d3c1"`
        );
        await queryRunner.query(
            `ALTER TABLE "user_actions" DROP CONSTRAINT "FK_f30f989f8d07c1e94261cf725cb"`
        );
        await queryRunner.query(`DROP INDEX "public"."IDX_a8afe0dc26bf08b0e7715b99c1"`);
        await queryRunner.query(`DROP TABLE "class_participants"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_age_level_enum"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TYPE "public"."classes_age_level_enum"`);
        await queryRunner.query(`DROP TABLE "user_actions"`);
        await queryRunner.query(`DROP TABLE "sports"`);
    }
}
