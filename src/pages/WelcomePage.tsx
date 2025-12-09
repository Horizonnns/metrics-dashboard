import React, { useState } from "react";
import { Activity, Plus, BarChart3, Users, Zap, TrendingUp } from "lucide-react";
import AddBotModal from "../components/AddBotModal";

const WelcomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: BarChart3,
      title: "Аналитика в реальном времени",
      description: "Отслеживайте метрики вашего бота в режиме реального времени",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Управление пользователями",
      description: "Следите за активностью и вовлеченностью пользователей",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Отчеты и статистика",
      description: "Подробные отчеты о производительности вашего бота",
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <>
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-green-200/40 to-emerald-200/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="text-center px-4 max-w-4xl mx-auto">
          {/* Main icon with floating animation */}
          <div className="relative inline-block mb-8">
            <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
              <Activity className="w-14 h-14 text-white" />
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-ping"></div>
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* Title with gradient */}
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              GigaMetrics
            </span>
          </h1>

          <p className="text-xl text-secondary-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Мощная платформа аналитики для вашего бота.
            <br />
            <span className="font-semibold text-secondary-900">
              Начните отслеживать метрики прямо сейчас!
            </span>
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-lg">Добавить первого бота</span>
            </div>
          </button>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-secondary-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient blob on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-lg mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Helper text */}
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-secondary-500">
            <Zap className="w-4 h-4 text-green-600" />
            <span>Или выберите существующего бота из меню слева</span>
          </div>
        </div>
      </div>

      <AddBotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `,
        }}
      />
    </>
  );
};

export default WelcomePage;
