-- ----------------------------
-- FUN-KM
-- version: 1.0.0
-- ----------------------------
-- ----------------------------
-- SCHEMA create
-- ----------------------------
CREATE SCHEMA IF NOT EXISTS fun_km;

-- ----------------------------
-- MENU init
-- ----------------------------
DROP TYPE IF EXISTS public.km_tenant_type CASCADE;
CREATE TYPE public.km_tenant_type AS ENUM ('personal', 'enterprise');
COMMENT ON TABLE "fun_km"."km_tenant" IS '租户类型';

DROP TYPE IF EXISTS public.km_share_scope CASCADE;
CREATE TYPE public.km_share_scope AS ENUM ('private', 'group', 'public');
COMMENT ON TABLE "fun_km"."km_tenant" IS '分享范围';

DROP TYPE IF EXISTS public.km_share_action CASCADE;
CREATE TYPE public.km_share_action AS ENUM ('read-only', 'editable', 'manageable');
COMMENT ON TABLE "fun_km"."km_tenant" IS '分享可操作行为';

-- ----------------------------
-- Table structure for km_tenant
-- ----------------------------
DROP TABLE IF EXISTS "fun_km"."km_tenant" CASCADE;
CREATE TABLE "fun_km"."km_tenant" (
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "invitation_code" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now(),
  "tenant_type" "public"."km_tenant_type" NOT NULL DEFAULT 'personal'::km_tenant_type,
  "favicon_path" varchar COLLATE "pg_catalog"."default",
  "logo_path" varchar COLLATE "pg_catalog"."default",
  "created_by" uuid NOT NULL,
  "is_review_open" bool NOT NULL DEFAULT false,
  "is_share_scope_change_allow" bool NOT NULL DEFAULT true,
  "is_share_action_change_allow" bool NOT NULL DEFAULT true,
  "is_share_scope_default" "public"."km_share_scope" NOT NULL DEFAULT 'group'::km_share_scope,
  "is_share_action_default" "public"."km_share_action" NOT NULL DEFAULT 'editable'::km_share_action,
  "id" uuid NOT NULL DEFAULT gen_random_uuid()
)
;
COMMENT ON TABLE "fun_km"."km_tenant" IS '租户表';
ALTER TABLE "fun_km"."km_tenant" ADD CONSTRAINT "km_ tenant_invitation_code_key" UNIQUE ("invitation_code");
ALTER TABLE "fun_km"."km_tenant" ADD CONSTRAINT "km_tenant_pkey" PRIMARY KEY ("id");
ALTER TABLE "fun_km"."km_tenant" ADD CONSTRAINT "km_tenant_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Table structure for km_tenant_users
-- ----------------------------
DROP TABLE IF EXISTS "fun_km"."km_tenant_users" CASCADE;
CREATE TABLE "fun_km"."km_tenant_users" (
  "user_id" uuid NOT NULL,
  "is_manager" bool NOT NULL DEFAULT false,
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now(),
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "tenant_id" uuid NOT NULL
)
;
COMMENT ON TABLE "fun_km"."km_tenant_users" IS '租户人员表';
ALTER TABLE "fun_km"."km_tenant_users" ADD CONSTRAINT "km_tenant_users_pkey" PRIMARY KEY ("id");
ALTER TABLE "fun_km"."km_tenant_users" ADD CONSTRAINT "km_tenant_users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "fun_km"."km_tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "fun_km"."km_tenant_users" ADD CONSTRAINT "km_tenant_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- function for register
-- ----------------------------
create or replace function fun_km.register (created_by_val uuid)
returns boolean
as $$
declare
  random_id uuid;
  v_isok boolean;
begin
  random_id := gen_random_uuid();
  v_isok := true;
  begin
    insert into fun_km.km_tenant (id, created_by, is_review_open, is_share_scope_change_allow, is_share_action_change_allow, is_share_scope_default, is_share_action_default, name)
      values(random_id, created_by_val, false, true, true, 'public'::km_share_scope, 'editable'::km_share_action, '个人空间');
    insert into fun_km.km_tenant_users(user_id, tenant_id, is_manager) values(created_by_val, random_id, true);
    exception when others then
      v_isok := false;
      rollback;
    if(v_isok) then
      commit;
    end if;
  end;
  return v_isok;
end;
$$
language plpgsql
security invoker;

-- ----------------------------
-- function for create_new_tenant
-- ----------------------------
create or replace function fun_km.create_new_tenant (created_by_val uuid, tenant_name varchar)
returns uuid
as $$
declare
  random_id uuid;
  v_isok boolean;
begin
  random_id := gen_random_uuid();
  v_isok := true;
  begin
    insert into fun_km.km_tenant (id, created_by, is_review_open, is_share_scope_change_allow, is_share_action_change_allow, is_share_scope_default, is_share_action_default, tenant_type, name)
      values(random_id, created_by_val, false, true, true, 'group'::km_share_scope, 'editable'::km_share_action, 'enterprise'::km_tenant_type, tenant_name);
    insert into fun_km.km_tenant_users(user_id, tenant_id, is_manager) values(created_by_val, random_id, true);
    exception when others then
      v_isok := false;
      rollback;
    if(v_isok) then
      commit;
    end if;
  end;
  if(v_isok) then
    return random_id;
  end if;
  return null;
end;
$$
language plpgsql
security invoker;

-- ----------------------------
-- SCHEMA role init
-- ----------------------------
GRANT USAGE ON SCHEMA fun_km TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA fun_km TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA fun_km TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA fun_km TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA fun_km GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA fun_km GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA fun_km GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
