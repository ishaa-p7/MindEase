import fetch from "node-fetch";

export const generateMeme = async (req, res) => {
  const { template_id, text0, text1 } = req.body;

  try {
    const params = new URLSearchParams();
    params.append("template_id", template_id);
    params.append("username", process.env.IMGFLIP_USERNAME);
    params.append("password", process.env.IMGFLIP_PASSWORD);
    params.append("text0", text0);
    params.append("text1", text1);

    const response = await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: params
    });

    const data = await response.json();

    if (data.success) {
      res.status(200).json({ url: data.data.url });
    } else {
      res.status(500).json({ error: "Failed to generate meme", details: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
