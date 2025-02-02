export const uploadToKnowledgeBase = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      // First request: Upload document
      console.log("Uploading to ElevenLabs...");
      const uploadResponse = await fetch(
        `https://api.elevenlabs.io/v1/convai/agents/${process.env.REACT_APP_ELEVENLABS_AGENT_ID}/add-to-knowledge-base`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': process.env.REACT_APP_ELEVENLABS_API_KEY,
          },
          body: formData,
        }
      );
  
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.text();
        throw new Error(`Upload failed: ${errorData}`);
      }
  
      const uploadData = await uploadResponse.json();
      const documentId = uploadData.id;
      console.log("Document uploaded successfully, ID:", documentId);
  
      // Second request: Update agent
      const updateResponse = await fetch(
        `https://api.elevenlabs.io/v1/convai/agents/${process.env.REACT_APP_ELEVENLABS_AGENT_ID}`,
        {
          method: 'PATCH',
          headers: {
            'xi-api-key': process.env.REACT_APP_ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversation_config: {
              agent: {
                prompt: {
                  knowledge_base: [
                    {
                      type: "file",
                      name: file.name,
                      id: documentId
                    }
                  ]
                }
              }
            }
          }),
        }
      );
  
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error("Agent update failed:", errorData);
        throw new Error(`Agent update failed: ${JSON.stringify(errorData)}`);
      }
  
      const updateResult = await updateResponse.json();
      console.log("Agent updated successfully:", updateResult);
  
      return {
        success: true,
        documentId,
        message: 'Document uploaded and agent updated successfully'
      };
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  };