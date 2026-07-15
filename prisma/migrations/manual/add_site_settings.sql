-- Migration: add site_settings table
-- Run this when your PostgreSQL database is connected.

CREATE TABLE IF NOT EXISTS "site_settings" (
    "id"        TEXT NOT NULL,
    "key"       TEXT NOT NULL,
    "value"     TEXT NOT NULL,
    "label"     TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "site_settings_key_key" ON "site_settings"("key");
