import { ArrowUpRight, TrendingUp, Wallet } from "lucide-react"
import React from "react"

interface PaymentsListProps {
  data: Record<string, { count: number; totalAmount: number }>;
}

const PaymentsList: React.FC<PaymentsListProps> = ({ data }) => {
  const payments = Object.entries(data || {})
    .map(([date, info]) => ({
      date: new Date(date),
      ...info,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 30); // Show last 30 days

  // Calculate statistics
  const totalRevenue = payments.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalTransactions = payments.reduce((sum, p) => sum + p.count, 0);
  const avgPerDay = payments.length > 0 ? Math.round(totalRevenue / payments.length) : 0;
  const maxPayment =
    payments.length > 0 ? Math.max(...payments.map((p) => p.totalAmount)) : 0;

  return (
    <div className="bg-gradient-to-br from-white via-green-50/20 to-emerald-50/20 p-6 rounded-3xl shadow-soft border border-secondary-100 relative overflow-hidden flex flex-col">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black text-secondary-900 tracking-tight">
            История платежей
          </h3>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-2.5 rounded-xl border border-secondary-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              <p className="text-xs text-secondary-500 font-semibold uppercase tracking-wider">
                Всего
              </p>
            </div>
            <p className="text-lg font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ₽{totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-3 py-2.5 rounded-xl border border-secondary-100 shadow-sm">
            <p className="text-xs text-secondary-500 font-semibold uppercase tracking-wider mb-1">
              Средний чек
            </p>
            <p className="text-lg font-bold text-secondary-900">
              ₽{avgPerDay.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[280px] custom-scrollbar">
        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-3">
              <Wallet className="w-8 h-8 text-secondary-400" />
            </div>
            <p className="text-secondary-500 text-sm font-semibold">Платежей пока нет</p>
            <p className="text-secondary-400 text-xs mt-1">
              История появится после первой транзакции
            </p>
          </div>
        ) : (
          payments.map((payment, idx) => {
            const percentage =
              maxPayment > 0 ? (payment.totalAmount / maxPayment) * 100 : 0;
            const isRecent = idx < 3;

            return (
              <div
                key={idx}
                className={`group relative p-3.5 rounded-2xl transition-all duration-300 border ${
                  isRecent
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md"
                    : "bg-white/60 border-secondary-100 hover:bg-white hover:shadow-sm"
                }`}
              >
                {/* Progress bar background */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-emerald-100/20 rounded-2xl transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isRecent
                          ? "bg-gradient-to-br from-green-500 to-emerald-500 shadow-md"
                          : "bg-green-100 group-hover:bg-green-200"
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 ${
                          isRecent ? "text-white" : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-secondary-900">
                        {payment.date.toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                      <p className="text-xs text-secondary-500 font-medium">
                        {payment.count}{" "}
                        {payment.count === 1
                          ? "платеж"
                          : payment.count < 5
                          ? "платежа"
                          : "платежей"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-base font-black ${
                        isRecent
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                          : "text-secondary-900"
                      }`}
                    >
                      ₽{payment.totalAmount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <p className="text-xs text-green-600 font-bold">
                        {((payment.totalAmount / totalRevenue) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {payments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-secondary-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-500 font-medium">
              {totalTransactions} транзакций за период
            </span>
            <span className="text-secondary-600 font-semibold">30 дней</span>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
      `,
        }}
      />
    </div>
  );
};

export default PaymentsList;
