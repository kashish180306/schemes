import { useState, useEffect } from "react";
import { api, Scheme } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2, AlertTriangle } from "lucide-react";

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "GovSchemes2025!",
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [deleteSchemeId, setDeleteSchemeId] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    details: "",
    content: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (authenticated) {
      loadSchemes();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setAuthenticated(true);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const loadSchemes = async () => {
    setLoading(true);
    try {
      const response = await api.getSchemes(1, 100);
      setSchemes(response.data);
    } catch (error) {
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.details) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("details", formData.details);
    data.append("content", formData.content);
    data.append("link", formData.link);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (editingScheme) {
        await api.updateScheme(editingScheme._id, data);
        toast.success("Scheme updated successfully!");
      } else {
        await api.createScheme(data);
        toast.success("Scheme created successfully!");
      }
      resetForm();
      loadSchemes();
      setShowAddDialog(false);
    } catch (error) {
      toast.error("Failed to save scheme");
    }
  };

  const handleEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setFormData({
      name: scheme.name,
      category: scheme.category,
      details: scheme.details,
      content: scheme.content,
      link: scheme.link,
    });
    setImagePreview(scheme.imageUrl);
    setShowAddDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteSchemeId) return;

    try {
      await api.deleteScheme(deleteSchemeId);
      toast.success("Scheme deleted successfully!");
      loadSchemes();
      setDeleteSchemeId(null);
    } catch (error) {
      toast.error("Failed to delete scheme");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      details: "",
      content: "",
      link: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingScheme(null);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-20">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-card p-8 rounded-3xl border border-border">
              <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
              
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-destructive">
                    <strong>Demo Only:</strong> This uses client-side credentials and is
                    not secure for production. Use server-side authentication in production.
                  </div>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-full" size="lg">
                  Login
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-xl text-sm text-muted-foreground">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Username: admin</p>
                <p>Password: GovSchemes2025!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-full" onClick={resetForm}>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Scheme
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingScheme ? "Edit Scheme" : "Add New Scheme"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Scheme Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="details">Short Details *</Label>
                    <Textarea
                      id="details"
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Full Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="min-h-32"
                    />
                  </div>
                  <div>
                    <Label htmlFor="link">Portal Link</Label>
                    <Input
                      id="link"
                      type="url"
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 w-full h-48 object-cover rounded-xl"
                      />
                    )}
                  </div>
                  <Button type="submit" className="w-full rounded-full">
                    {editingScheme ? "Update Scheme" : "Create Scheme"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-4">
              {schemes.map((scheme) => (
                <div
                  key={scheme._id}
                  className="bg-card p-6 rounded-2xl border border-border flex items-center gap-6"
                >
                  <img
                    src={scheme.imageUrl}
                    alt={scheme.name}
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{scheme.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {scheme.category}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {scheme.details}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(scheme)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setDeleteSchemeId(scheme._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialog
        open={!!deleteSchemeId}
        onOpenChange={() => setDeleteSchemeId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              scheme and its associated image from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
