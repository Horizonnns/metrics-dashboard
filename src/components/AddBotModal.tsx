import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBot } from "../store/botsSlice";
import { X, Check, AlertCircle, Bot, Globe, Key, Tag } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

interface AddBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBotModal: React.FC<AddBotModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!name.trim() || !url.trim() || !secretKey.trim()) {
      setError("Все поля обязательны для заполнения");
      setIsSubmitting(false);
      return;
    }

    try {
      new URL(url); // Validate URL
    } catch {
      setError("Неверный формат URL (например, http://localhost:4000)");
      setIsSubmitting(false);
      return;
    }

    dispatch(
      addBot({
        id: uuidv4(),
        name: name.trim(),
        url: url.trim(),
        secretKey: secretKey.trim(),
      })
    );

    // Reset form
    setName("");
    setUrl("");
    setSecretKey("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="group relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-8 pb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-6 -mb-6"></div>

          <div className="relative z-10 flex items-start justify-between text-white">
            <div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl w-fit mb-4 shadow-inner">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-1">Новый бот</h3>
              <p className="text-green-50 font-medium opacity-90">
                Подключите ваш сервис к дашборду
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Container (Negative margin to pull up over header) */}
        <div className="relative px-8 pb-8 -mt-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-6 border border-secondary-100 space-y-5"
          >
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3 border border-red-100 animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">
                Название
              </label>
              <div className="relative group/input">
                <div className="absolute left-4 top-3.5 text-secondary-400 group-focus-within/input:text-green-500 transition-colors">
                  <Tag className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Мой GigaБот"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 bg-secondary-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all placeholder:text-secondary-400 font-medium font-sans"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">
                URL сервера
              </label>
              <div className="relative group/input">
                <div className="absolute left-4 top-3.5 text-secondary-400 group-focus-within/input:text-green-500 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.myserver.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 bg-secondary-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all placeholder:text-secondary-400 font-medium font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">
                Секретный ключ
              </label>
              <div className="relative group/input">
                <div className="absolute left-4 top-3.5 text-secondary-400 group-focus-within/input:text-green-500 transition-colors">
                  <Key className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 bg-secondary-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all placeholder:text-secondary-400 font-medium font-sans"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-xl transition-all font-bold text-sm"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "flex-[2] px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed",
                  isSubmitting && "animate-pulse"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Добавление...
                  </span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Подключить
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBotModal;
