import { ref, onMounted, onUnmounted } from 'vue';
import * as signalR from '@microsoft/signalr';

const connection = ref(null);
const isConnected = ref(false);
const error = ref(null);
const eventHandlers = {};
let initPromise = null;

export function useSignalR(options = {}) {
    const hubUrl = 'http://localhost:5033/socket'; // Постоянный хост вашего сервера

    // Инициализируем соединение только один раз
    const initConnection = async () => {
        if (initPromise) {
            return initPromise;
        }

        connection.value = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, options)
            .withAutomaticReconnect()
            .build();

        // Регистрируем сохраненные обработчики событий
        for (const [eventName, handlers] of Object.entries(eventHandlers)) {
            handlers.forEach((handler) => {
                connection.value.on(eventName, handler);
            });
        }

        connection.value.onclose((err) => {
            isConnected.value = false;
            if (err) {
                console.error('SignalR connection closed with error:', err);
                error.value = err;
            } else {
                console.log('SignalR connection closed.');
            }
        });

        connection.value.onreconnected(() => {
            isConnected.value = true;
            console.log('SignalR reconnected.');
        });

        initPromise = connection.value
            .start()
            .then(() => {
                isConnected.value = true;
                console.log('SignalR connected.');
            })
            .catch((err) => {
                console.error('SignalR connection error:', err);
                error.value = err;
            });

        return initPromise;
    };

    // Регистрация обработчика события
    const on = (eventName, handler) => {
        if (!eventHandlers[eventName]) {
            eventHandlers[eventName] = new Set();
        }
        eventHandlers[eventName].add(handler);

        if (connection.value) {
            connection.value.on(eventName, handler);
        }
    };

    // Удаление обработчика события
    const off = (eventName, handler) => {
        if (eventHandlers[eventName]) {
            eventHandlers[eventName].delete(handler);
            if (connection.value) {
                connection.value.off(eventName, handler);
            }
            if (eventHandlers[eventName].size === 0) {
                delete eventHandlers[eventName];
            }
        }
    };

    // Вызов метода на сервере
    const invoke = async (methodName, ...args) => {
        if (connection.value) {
            try {
                return await connection.value.invoke(methodName, ...args);
            } catch (err) {
                console.error(`Error invoking method ${methodName}:`, err);
                error.value = err;
            }
        } else {
            console.warn('SignalR connection is not established.');
        }
    };

    // Хуки жизненного цикла
    onMounted(() => {
        initConnection();
    });

    // Мы не останавливаем соединение при размонтировании, так как оно может использоваться другими компонентами

    return {
        isConnected,
        error,
        on,
        off,
        invoke,
        connection,
    };
}
