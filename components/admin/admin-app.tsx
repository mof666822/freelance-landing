"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultContent } from "@/lib/defaults";
import type { ExampleItem, SiteContent } from "@/lib/types";

function emptyExample(): ExampleItem {
  return {
    id: `ex-${Date.now()}`,
    category: "sites",
    image: "",
    title: { ru: "", en: "" },
    description: { ru: "", en: "" },
    link: "",
  };
}

export function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [status, setStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/admin/me");
        if (me.ok) {
          setAuthed(true);
          const res = await fetch("/api/admin/content");
          if (res.ok) {
            setContent(await res.json());
          }
        }
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const secondary = useMemo(
    () =>
      content.contacts.secondary || {
        label: { ru: "Написать в ЛС", en: "Message in DMs" },
        url: "",
      },
    [content.contacts.secondary],
  );

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Неверный пароль");
      return;
    }
    setAuthed(true);
    const contentRes = await fetch("/api/admin/content");
    if (contentRes.ok) setContent(await contentRes.json());
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const form = new FormData();
      const payload: SiteContent = {
        ...content,
        contacts: {
          ...content.contacts,
          secondary: content.contacts.secondary?.url
            ? content.contacts.secondary
            : null,
        },
      };
      form.set("content", JSON.stringify(payload));
      Object.entries(files).forEach(([id, file]) => {
        form.append(`file:${id}`, file);
      });
      const res = await fetch("/api/admin/content", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("fail");
      const data = await res.json();
      setContent(data.content);
      setFiles({});
      setStatus("Сохранено");
    } catch {
      setStatus("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  if (checking) {
    return <div className="p-8 text-muted-foreground">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Вход в админку</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {loginError ? (
                <p className="text-sm text-red-400">{loginError}</p>
              ) : null}
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Админка</h1>
        <div className="flex gap-2">
          <Button onClick={save} disabled={saving} variant="neon">
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
          <Button onClick={logout} variant="outline">
            Выйти
          </Button>
        </div>
      </div>
      {status ? <p className="text-sm text-neon">{status}</p> : null}

      <Card>
        <CardHeader>
          <CardTitle>Hero</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field
            label="Заголовок (RU)"
            value={content.hero.title.ru}
            onChange={(v) =>
              setContent({
                ...content,
                hero: { ...content.hero, title: { ...content.hero.title, ru: v } },
              })
            }
          />
          <Field
            label="Заголовок (EN)"
            value={content.hero.title.en}
            onChange={(v) =>
              setContent({
                ...content,
                hero: { ...content.hero, title: { ...content.hero.title, en: v } },
              })
            }
          />
          <Area
            label="Подзаголовок (RU)"
            value={content.hero.subtitle.ru}
            onChange={(v) =>
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  subtitle: { ...content.hero.subtitle, ru: v },
                },
              })
            }
          />
          <Area
            label="Подзаголовок (EN)"
            value={content.hero.subtitle.en}
            onChange={(v) =>
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  subtitle: { ...content.hero.subtitle, en: v },
                },
              })
            }
          />
        </CardContent>
      </Card>

      {(["sites", "bots"] as const).map((key) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>
              Карточка: {key === "sites" ? "Сайты" : "Боты и Mini Apps"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field
              label="Заголовок (RU)"
              value={content.categories[key].title.ru}
              onChange={(v) =>
                setContent({
                  ...content,
                  categories: {
                    ...content.categories,
                    [key]: {
                      ...content.categories[key],
                      title: { ...content.categories[key].title, ru: v },
                    },
                  },
                })
              }
            />
            <Field
              label="Заголовок (EN)"
              value={content.categories[key].title.en}
              onChange={(v) =>
                setContent({
                  ...content,
                  categories: {
                    ...content.categories,
                    [key]: {
                      ...content.categories[key],
                      title: { ...content.categories[key].title, en: v },
                    },
                  },
                })
              }
            />
            <Area
              label="Описание (RU)"
              value={content.categories[key].description.ru}
              onChange={(v) =>
                setContent({
                  ...content,
                  categories: {
                    ...content.categories,
                    [key]: {
                      ...content.categories[key],
                      description: {
                        ...content.categories[key].description,
                        ru: v,
                      },
                    },
                  },
                })
              }
            />
            <Area
              label="Описание (EN)"
              value={content.categories[key].description.en}
              onChange={(v) =>
                setContent({
                  ...content,
                  categories: {
                    ...content.categories,
                    [key]: {
                      ...content.categories[key],
                      description: {
                        ...content.categories[key].description,
                        en: v,
                      },
                    },
                  },
                })
              }
            />
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Шаги инструкции</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.steps.map((step, index) => (
            <div key={step.id} className="rounded-xl border border-white/10 p-4">
              <p className="mb-3 text-sm font-semibold text-telegram">
                Шаг {index + 1}
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Иконка (lucide)"
                  value={step.icon}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[index] = { ...step, icon: v };
                    setContent({ ...content, steps });
                  }}
                />
                <div />
                <Field
                  label="Заголовок (RU)"
                  value={step.title.ru}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[index] = {
                      ...step,
                      title: { ...step.title, ru: v },
                    };
                    setContent({ ...content, steps });
                  }}
                />
                <Field
                  label="Заголовок (EN)"
                  value={step.title.en}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[index] = {
                      ...step,
                      title: { ...step.title, en: v },
                    };
                    setContent({ ...content, steps });
                  }}
                />
                <Area
                  label="Описание (RU)"
                  value={step.description.ru}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[index] = {
                      ...step,
                      description: { ...step.description, ru: v },
                    };
                    setContent({ ...content, steps });
                  }}
                />
                <Area
                  label="Описание (EN)"
                  value={step.description.en}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[index] = {
                      ...step,
                      description: { ...step.description, en: v },
                    };
                    setContent({ ...content, steps });
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {(["sites", "bots"] as const).map((key) => (
        <Card key={`services-${key}`}>
          <CardHeader>
            <CardTitle>
              Подуслуги: {key === "sites" ? "Сайты" : "Боты"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.categories[key].services.map((service, index) => (
              <div
                key={service.id}
                className="rounded-xl border border-white/10 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <Field
                    label="Иконка"
                    value={service.icon}
                    onChange={(v) => {
                      const services = [...content.categories[key].services];
                      services[index] = { ...service, icon: v };
                      setContent({
                        ...content,
                        categories: {
                          ...content.categories,
                          [key]: { ...content.categories[key], services },
                        },
                      });
                    }}
                  />
                  <div />
                  <Field
                    label="Название (RU)"
                    value={service.title.ru}
                    onChange={(v) => {
                      const services = [...content.categories[key].services];
                      services[index] = {
                        ...service,
                        title: { ...service.title, ru: v },
                      };
                      setContent({
                        ...content,
                        categories: {
                          ...content.categories,
                          [key]: { ...content.categories[key], services },
                        },
                      });
                    }}
                  />
                  <Field
                    label="Название (EN)"
                    value={service.title.en}
                    onChange={(v) => {
                      const services = [...content.categories[key].services];
                      services[index] = {
                        ...service,
                        title: { ...service.title, en: v },
                      };
                      setContent({
                        ...content,
                        categories: {
                          ...content.categories,
                          [key]: { ...content.categories[key], services },
                        },
                      });
                    }}
                  />
                  <Area
                    label="Описание (RU)"
                    value={service.description.ru}
                    onChange={(v) => {
                      const services = [...content.categories[key].services];
                      services[index] = {
                        ...service,
                        description: { ...service.description, ru: v },
                      };
                      setContent({
                        ...content,
                        categories: {
                          ...content.categories,
                          [key]: { ...content.categories[key], services },
                        },
                      });
                    }}
                  />
                  <Area
                    label="Описание (EN)"
                    value={service.description.en}
                    onChange={(v) => {
                      const services = [...content.categories[key].services];
                      services[index] = {
                        ...service,
                        description: { ...service.description, en: v },
                      };
                      setContent({
                        ...content,
                        categories: {
                          ...content.categories,
                          [key]: { ...content.categories[key], services },
                        },
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Оплата</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Area
            label="Текст (RU)"
            value={content.payment.ru}
            onChange={(v) =>
              setContent({
                ...content,
                payment: { ...content.payment, ru: v },
              })
            }
          />
          <Area
            label="Текст (EN)"
            value={content.payment.en}
            onChange={(v) =>
              setContent({
                ...content,
                payment: { ...content.payment, en: v },
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контакты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-xl border border-white/10 p-4">
            <p className="mb-3 text-sm font-semibold">Контакт 1</p>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Текст кнопки (RU)"
                value={content.contacts.primary.label.ru}
                onChange={(v) =>
                  setContent({
                    ...content,
                    contacts: {
                      ...content.contacts,
                      primary: {
                        ...content.contacts.primary,
                        label: { ...content.contacts.primary.label, ru: v },
                      },
                    },
                  })
                }
              />
              <Field
                label="Текст кнопки (EN)"
                value={content.contacts.primary.label.en}
                onChange={(v) =>
                  setContent({
                    ...content,
                    contacts: {
                      ...content.contacts,
                      primary: {
                        ...content.contacts.primary,
                        label: { ...content.contacts.primary.label, en: v },
                      },
                    },
                  })
                }
              />
              <Field
                label="URL"
                value={content.contacts.primary.url}
                onChange={(v) =>
                  setContent({
                    ...content,
                    contacts: {
                      ...content.contacts,
                      primary: { ...content.contacts.primary, url: v },
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 p-4">
            <p className="mb-2 text-sm font-semibold">Контакт 2</p>
            <p className="mb-3 text-xs text-muted-foreground">
              Пока URL пуст — кнопка 2 дублирует контакт 1
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Текст кнопки (RU)"
                value={secondary.label.ru}
                onChange={(v) =>
                  setContent({
                    ...content,
                    contacts: {
                      ...content.contacts,
                      secondary: {
                        ...secondary,
                        label: { ...secondary.label, ru: v },
                      },
                    },
                  })
                }
              />
              <Field
                label="Текст кнопки (EN)"
                value={secondary.label.en}
                onChange={(v) =>
                  setContent({
                    ...content,
                    contacts: {
                      ...content.contacts,
                      secondary: {
                        ...secondary,
                        label: { ...secondary.label, en: v },
                      },
                    },
                  })
                }
              />
              <Field
                label="URL"
                value={secondary.url}
                onChange={(v) =>
                  setContent({
                    ...content,
                    contacts: {
                      ...content.contacts,
                      secondary: { ...secondary, url: v },
                    },
                  })
                }
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() =>
                setContent({
                  ...content,
                  contacts: { ...content.contacts, secondary: null },
                })
              }
            >
              Очистить второй контакт
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Примеры работ</CardTitle>
            <Button
              type="button"
              onClick={() =>
                setContent({
                  ...content,
                  examples: [...content.examples, emptyExample()],
                })
              }
            >
              Добавить пример
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!content.examples.length ? (
            <p className="text-sm text-muted-foreground">
              Список пуст — секция на сайте скрыта.
            </p>
          ) : null}
          {content.examples.map((example, index) => (
            <div
              key={example.id}
              className="rounded-xl border border-white/10 p-4"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    value={example.category}
                    onChange={(e) => {
                      const examples = [...content.examples];
                      examples[index] = {
                        ...example,
                        category: e.target.value as "sites" | "bots",
                      };
                      setContent({ ...content, examples });
                    }}
                  >
                    <option value="sites">Сайты</option>
                    <option value="bots">Боты</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Изображение</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setFiles((prev) => ({ ...prev, [example.id]: file }));
                    }}
                  />
                  {example.image ? (
                    <p className="text-xs text-muted-foreground">{example.image}</p>
                  ) : null}
                </div>
                <Field
                  label="Название (RU)"
                  value={example.title.ru}
                  onChange={(v) => {
                    const examples = [...content.examples];
                    examples[index] = {
                      ...example,
                      title: { ...example.title, ru: v },
                    };
                    setContent({ ...content, examples });
                  }}
                />
                <Field
                  label="Название (EN)"
                  value={example.title.en}
                  onChange={(v) => {
                    const examples = [...content.examples];
                    examples[index] = {
                      ...example,
                      title: { ...example.title, en: v },
                    };
                    setContent({ ...content, examples });
                  }}
                />
                <Area
                  label="Описание (RU)"
                  value={example.description.ru}
                  onChange={(v) => {
                    const examples = [...content.examples];
                    examples[index] = {
                      ...example,
                      description: { ...example.description, ru: v },
                    };
                    setContent({ ...content, examples });
                  }}
                />
                <Area
                  label="Описание (EN)"
                  value={example.description.en}
                  onChange={(v) => {
                    const examples = [...content.examples];
                    examples[index] = {
                      ...example,
                      description: { ...example.description, en: v },
                    };
                    setContent({ ...content, examples });
                  }}
                />
                <Field
                  label="Ссылка (опционально)"
                  value={example.link || ""}
                  onChange={(v) => {
                    const examples = [...content.examples];
                    examples[index] = { ...example, link: v };
                    setContent({ ...content, examples });
                  }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() =>
                  setContent({
                    ...content,
                    examples: content.examples.filter((_, i) => i !== index),
                  })
                }
              >
                Удалить
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="sticky bottom-4 flex justify-end">
        <Button onClick={save} disabled={saving} variant="neon" size="lg">
          {saving ? "Сохранение…" : "Сохранить"}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
