"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, Calendar, MessageCircle, Clock, User,
  ArrowLeft, ArrowRight, Share2, Bookmark, Facebook, Twitter, Link2,
  Send, Loader2, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "@/lib/store";
import { useTurnstile } from "@/components/site/turnstile-widget";

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

export function BlogSinglePage() {
  const blogPosts = useRouter((s) => s.blogPosts);
  const navigate = useRouter((s) => s.navigate);
  const params = useRouter((s) => s.params);
  const dataLoaded = useRouter((s) => s.dataLoaded);

  // Find by slug (preferred) or by blogId (fallback)
  const post = params.blogSlug
    ? blogPosts.find((p) => p.slug === params.blogSlug)
    : params.blogId
    ? blogPosts.find((p) => p.id === params.blogId)
    : null;

  if (!dataLoaded) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-bounce">📝</div>
          <p className="text-cocoa/60 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h1 className="font-display text-2xl font-semibold text-cocoa mb-2">Article not found</h1>
        <p className="text-cocoa/60 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Button onClick={() => navigate("blog")} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
          Back to Blog
        </Button>
      </div>
    );
  }

  const related = blogPosts.length > 1
    ? blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
    : [];
  if (related.length < 3 && blogPosts.length > 1) {
    const others = blogPosts.filter((p) => p.id !== post.id && p.category !== post.category).slice(0, 3 - related.length);
    related.push(...others);
  }

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60 flex-wrap">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => navigate("blog")} className="hover:text-terracotta">Blog</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium line-clamp-1">{post.category}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge className="bg-terracotta/10 text-terracotta border-0 mb-4">{post.category}</Badge>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa leading-tight tracking-tight text-balance">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-cocoa/60">
            <span className="inline-flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-semibold text-xs">
                B
              </div>
              <span className="font-medium text-cocoa">{post.author}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" /> {post.comments} comments
            </span>
          </div>
        </motion.header>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br ${post.bg} rounded-3xl overflow-hidden flex items-center justify-center mb-8`}
        >
          {post.cover_image ? (
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <span className="text-[160px] sm:text-[200px] drop-shadow-2xl select-none">{post.emoji}</span>
          )}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-6 right-6 h-32 w-32 rounded-full border-2 border-dashed border-cocoa/20" />
            <div className="absolute bottom-6 left-6 h-20 w-20 rounded-full border-2 border-dashed border-cocoa/15" />
          </div>
        </motion.div>

        {/* Share bar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/60">
          <div className="flex items-center gap-2 text-sm text-cocoa/60">
            <span>Share:</span>
            {[Facebook, Twitter, Link2].map((Icon, i) => (
              <button
                key={i}
                className="h-9 w-9 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa/70 flex items-center justify-center transition-colors"
                aria-label="Share"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <button className="h-9 w-9 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa/70 flex items-center justify-center transition-colors" aria-label="Bookmark">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg sm:text-xl text-cocoa/80 leading-relaxed font-medium mb-8 first-letter:text-5xl first-letter:font-display first-letter:font-semibold first-letter:text-terracotta first-letter:mr-2 first-letter:float-left first-letter:leading-none">
            {post.excerpt}
          </p>

          {post.content.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              {section.heading && (
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mt-8 mb-4 leading-tight">
                  {section.heading}
                </h2>
              )}
              <div
                className="text-base sm:text-lg text-cocoa/75 leading-relaxed blog-content"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </motion.section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-border/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-cocoa/70">Tags:</span>
            {[post.category, "Pet Care", "Bangladesh", "BD71"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate("blog")}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa/70 transition-colors"
              >
                #{tag.replace(/\s+/g, "")}
              </button>
            ))}
          </div>
        </div>

        {/* Author box */}
        <div className="mt-8 bg-card rounded-2xl border border-border/60 p-6 flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-terracotta text-primary-foreground flex items-center justify-center font-display font-semibold text-lg shrink-0">
            B
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-cocoa">{post.author}</div>
            <div className="text-xs text-cocoa/60 mb-2">Pet care expert at BD71 Pet Shop</div>
            <p className="text-sm text-cocoa/70 leading-relaxed">
              Dedicated to helping pet parents across Bangladesh make informed decisions about their
              companions&apos; nutrition, health, and wellbeing. Follow our blog for weekly tips and guides.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("blog")}
            className="rounded-full border-2 border-cocoa/15 hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Articles
          </Button>
          <Button
            onClick={() => {
              if (blogPosts.length > 1) {
                const nextIdx = (blogPosts.findIndex((p) => p.id === post.id) + 1) % blogPosts.length;
                navigate("blog-single", { blogSlug: blogPosts[nextIdx]?.slug || String(blogPosts[nextIdx]?.id || 1) });
              }
            }}
            className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full"
          >
            Next Article
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </article>

      {/* Comments Section */}
      <BlogComments postSlug={post.slug ?? ""} />

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-6 text-center">
              You might also enjoy
            </h2>
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
              {related.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => navigate("blog-single", { blogSlug: p.slug || String(p.id) })}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col text-left"
                >
                  <div className={`relative h-44 bg-gradient-to-br ${p.bg || "from-amber-glow/20 to-terracotta/15"} flex items-center justify-center overflow-hidden`}>
                    {p.cover_image ? (
                      <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover absolute inset-0" loading="lazy" />
                    ) : (
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{p.emoji || "🐾"}</span>
                    )}
                    <Badge className="absolute top-3 left-3 bg-card/90 text-cocoa border-0 text-[10px]">{p.category}</Badge>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs text-cocoa/60 mb-2">{p.date} · {p.readTime}</div>
                    <h3 className="font-display text-base font-semibold text-cocoa leading-tight line-clamp-2 group-hover:text-terracotta transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-cocoa/65 line-clamp-2 flex-1">{p.excerpt}</p>
                    <span className="mt-3 text-sm font-medium text-terracotta inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// =====================================================
// BlogComments — comment list + submit form
// =====================================================
function BlogComments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ authorName: "", authorEmail: "", content: "" });
  const { token: turnstileToken, widget: turnstileWidget } = useTurnstile();

  useEffect(() => {
    if (!postSlug) return;
    fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/posts/${postSlug}/comments`, {
      headers: { "X-API-Key": CMS_API_KEY },
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) setComments(json.data.comments ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [postSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.authorName.trim() || !form.content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/posts/${postSlug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": CMS_API_KEY,
          ...(turnstileToken ? { "x-turnstile-token": turnstileToken } : {}),
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setShowForm(false);
        setForm({ authorName: "", authorEmail: "", content: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch {}
    finally { setSubmitting(false); }
  }

  const totalComments = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);

  return (
    <section className="py-12 bg-secondary/20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold text-cocoa flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-terracotta" />
            Comments {totalComments > 0 && `(${totalComments})`}
          </h2>
          {!showForm && (
            <Button variant="outline" onClick={() => setShowForm(true)} className="rounded-full">
              Write a Comment
            </Button>
          )}
        </div>

        {/* Success message */}
        {submitted && (
          <div className="bg-sage/10 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Check className="h-5 w-5 text-sage" />
            <div>
              <p className="font-medium text-cocoa text-sm">Thank you for your comment!</p>
              <p className="text-xs text-cocoa/60">It will appear here after the site admin approves it.</p>
            </div>
          </div>
        )}

        {/* Comment form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border/60 p-6 mb-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-cocoa">Name *</label>
                <input
                  type="text" required value={form.authorName}
                  onChange={e => setForm({ ...form, authorName: e.target.value })}
                  placeholder="Your name"
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-cocoa">Email (optional)</label>
                <input
                  type="email" value={form.authorEmail}
                  onChange={e => setForm({ ...form, authorEmail: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cocoa">Comment *</label>
              <textarea
                required value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                rows={4}
                placeholder="Share your thoughts..."
                className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-sm resize-none"
                maxLength={2000}
              />
              <p className="text-[10px] text-cocoa/40 mt-1">{form.content.length}/2000 chars</p>
            </div>
            {turnstileWidget}
            <div className="flex gap-2">
              <Button type="submit" disabled={submitting} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
                {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting</> : <><Send className="h-4 w-4 mr-2" />Submit Comment</>}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">Cancel</Button>
            </div>
          </motion.form>
        )}

        {/* Comments list */}
        {loading ? (
          <div className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin inline text-cocoa/40" /></div>
        ) : comments.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border/60 p-8 text-center">
            <MessageCircle className="h-10 w-10 mx-auto text-cocoa/20 mb-3" />
            <p className="text-cocoa/60 text-sm">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c, i) => (
              <CommentItem key={c.id ?? i} comment={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CommentItem({ comment, isReply = false }: { comment: any; isReply?: boolean }) {
  return (
    <div className={isReply ? "ml-8 sm:ml-12" : ""}>
      <div className="bg-card rounded-2xl border border-border/60 p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta font-bold shrink-0">
            {comment.author_name?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-cocoa text-sm">{comment.author_name}</p>
              {comment.is_verified_purchase && (
                <Badge className="bg-sage/15 text-sage border-0 text-[10px]">
                  <Check className="h-2.5 w-2.5 mr-1" />Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-cocoa/40 mt-0.5">
              {comment.created_at ? new Date(comment.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
            </p>
          </div>
        </div>
        <p className="text-sm text-cocoa/75 leading-relaxed whitespace-pre-line">{comment.content}</p>
      </div>
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply: any, i: number) => (
            <CommentItem key={reply.id ?? i} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
