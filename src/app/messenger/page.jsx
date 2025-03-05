"use client";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Settings,
  UserPlus,
  Bell,
  Search,
  Send,
  PaperclipIcon,
  MessageSquare,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { Smile } from "lucide-react";
import MainWrapper from "../components/MainWrapper";
import {
  useCreateChatMutation,
  useGetChatsQuery,
  useLazyGetChatByIdQuery,
} from "../rtkQuery/api/endpoints/chatApi";
import {
  useGetFriendsQuery,
  useLazyGetFriendsQuery,
} from "../rtkQuery/api/endpoints/friendsApi";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../rtkQuery/api/baseApi";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useSearchParams } from "next/navigation";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
export default function MessagingPage() {
  const [currentChat, setCurrentChat] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [getFriends, {}] = useLazyGetFriendsQuery();
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const { data: getChats, refetch } = useGetChatsQuery();
  const [getChatById, { data: getMessages }] = useLazyGetChatByIdQuery();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [createChat, {}] = useCreateChatMutation();
  const dispatch = useDispatch();
  const socketRef = useRef(null); // Store the WebSocket instance
  const chatContainerRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasRun = useRef(false); // Ref to track if the effect has run

  useEffect(() => {
    // Disable scrolling by setting overflow: hidden
    document.body.style.overflow = "hidden";

    // Cleanup: Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!hasRun.current && getChats?.results) {
      autoCreateChat();
      hasRun.current = true; // Mark the effect as run
    }
  }, [searchParams, getChats]);

  const autoCreateChat = async () => {
    const userId = searchParams.get("user");
    if (userId && getChats?.results) {
      const response = await createChat({
        second_person: userId,
        first_person: user.user_profile.id,
      });
      if (response.data.message) {
        const chat = getChats?.results.find(
          (v) =>
            v.second_person.id == userId &&
            v.first_person.id == user.user_profile.id
        );
        handleChatSelect(chat);
      } else {
        dispatch(
          baseApi.util.updateQueryData("getChats", undefined, (draft) => {
            draft.results.unshift({ ...response.data, active: true });
          })
        );
      }
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Add smooth scrolling
      });
    }
  }, [chats]);

  // Refetch data only if the URL matches a specific path
  useEffect(() => {
    if (pathname === "/messenger") {
      refetch();
    }
  }, [pathname]); // Trigger when the pathname changes

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/chat/?token=${token}`
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established.");
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);
        setChats((prev) => [...prev, data]);
      };

      socketRef.current.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
        if (event.code === 1005 || event.code === 1006) {
          console.error(
            "Abnormal closure detected. Attempting to reconnect..."
          );
          setTimeout(() => {
            socketRef.current = new WebSocket(
              `ws://127.0.0.1:8000/chat/?token=${token}`
            );
          }, 5000); // Reconnect after 5 seconds
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }

    // Cleanup function
    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }
    };
  }, [token]);
  // Function to send a message
  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "send_message",
          message: message,
          sent_by: user.user_profile.id,
          send_to:
            currentChat.first_person.id === user?.user_profile?.id
              ? currentChat.second_person.id
              : currentChat.first_person.id,
          thread_id: currentChat.id,
        })
      );
      setChats((prev) => [
        ...prev,
        {
          message: message,
          sent_by: user.user_profile.id,
          send_to:
            currentChat.first_person.id === user?.user_profile?.id
              ? currentChat.second_person.id
              : currentChat.first_person.id,
        },
      ]);
      setMessage("");

      console.log("Message sent.");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  const handleChatSelect = async (chat) => {
    setCurrentChat(chat);
    dispatch(
      baseApi.util.updateQueryData("getChats", undefined, (draft) => {
        draft.results.forEach((v) => {
          if (v.id === chat.id) {
            v.active = true; // Remove the object at the found index
          } else {
            v.active = false; // Remove the object at the found index
          }
        });
      })
    );
    const response = await getChatById(chat.id).unwrap();
    setChats(response.results);
    setMessage("");
    setIsChatListVisible(false); // Hide chat list on mobile after selection
  };

  const fetchSuggestions = async (query) => {
    if (query) {
      setLoading(true);
      const response = await getFriends(query).unwrap();
      setLoading(false);
      setSuggestions(response.friend);
    } else {
      setSuggestions([]);
    }
  };

  const debouncedSearch = debounce(fetchSuggestions, 300);
  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  const handleSuggestionClick = async (suggestion) => {
    const response = await createChat({
      second_person: suggestion.user_id,
      first_person: user.user_profile.id,
    });
    if (response.data.message) {
      const chat = getChats.results.find(
        (v) =>
          v.second_person.id == suggestion.user_id &&
          v.first_person.id == user.user_profile.id
      );
      handleChatSelect(chat);
    } else {
      dispatch(
        baseApi.util.updateQueryData("getChats", undefined, (draft) => {
          draft.results.unshift({ ...response.data, active: true });
        })
      );
    }
    setSearch("");
    refetch();
    setSuggestions([]);
  };
  return (
    <MainWrapper>
      {/* Mobile Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen
            ? "fixed inset-0 z-50 flex flex-col bg-white"
            : "hidden"
        } lg:hidden`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">Ashberri</h1>
          <button
            className="text-gray-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Chat List - conditionally visible on mobile */}
        <div
          className={`${
            isChatListVisible ? "block" : "hidden"
          } md:block w-full md:w-80 border-r border-gray-100 bg-white`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 text-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-2 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {/* User Avatar */}
                      <img
                        src={suggestion.image} // Replace with the actual image URL from your data
                        alt={suggestion.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {/* User Details */}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {suggestion.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {suggestion.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat List */}
            <div className="space-y-2 h-[calc(100vh-200px)] overflow-y-auto">
              {getChats?.results?.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    chat.active ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={
                          chat.first_person.id === user?.user_profile?.id
                            ? chat.second_person.file
                            : chat.first_person.file
                        }
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                    )} */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">
                      {chat.first_person.id === user?.user_profile?.id
                        ? chat.second_person.name
                        : chat.first_person.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {chat?.last_message?.message || ""}
                    </p>
                  </div>
                  {/* {chat.hasImage && (
                    <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <PaperclipIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area - conditionally visible on mobile */}
        <div
          className={`${
            !isChatListVisible ? "block" : "hidden"
          } md:block flex-1 bg-pink-50 relative mb-8`}
        >
          {currentChat?.first_person ? (
            <>
              <div className="border-b border-gray-100 bg-white p-4">
                <div className="flex items-center gap-3">
                  <button
                    className="md:hidden"
                    onClick={() => setIsChatListVisible(true)}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={
                        currentChat?.first_person?.id === user?.user_profile?.id
                          ? currentChat?.second_person?.file
                          : currentChat?.first_person?.file
                      }
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {currentChat?.first_person?.id === user?.user_profile?.id
                        ? currentChat?.second_person?.name
                        : currentChat?.first_person?.name}
                    </h3>
                    {/* <p className="text-sm text-gray-500">Active 1m ago</p> */}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="p-4 space-y-4 pb-24 h-[calc(100vh-170px)] overflow-y-auto"
              >
                {chats.map((message) => (
                  <div
                    key={uuidv4()}
                    className={`flex ${
                      message.sent_by == user?.user_profile.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl p-3 ${
                        message.sent_by == user.user_profile.id
                          ? "bg-green-100 text-gray-800"
                          : "bg-blue-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
                <div className="flex items-center gap-2">
                  {/* <Smile className="h-6 w-6 text-purple-500" />
                  <PaperclipIcon className="h-6 w-6 text-purple-500" /> */}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border-none bg-gray-100 p-2 rounded-full focus:outline-none focus:ring-1  text-black"
                  />
                  <button onClick={sendMessage} className="text-purple-500">
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[calc(100vh)]">
              <img
                src="https://i.pinimg.com/736x/76/d2/b0/76d2b08aa833d3c4e32f50f20a393d5d.jpg"
                alt="No chat selected"
                className="h-full object-cover"
              />
            </div>
          )}
        </div>
      </main>
    </MainWrapper>
  );
}
